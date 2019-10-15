using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;

namespace DietitianApp.Services
{
    public class S3Service
    {
        private IAmazonS3 s3Client { get; set; }
        private string BucketName { get; set; }

        public S3Service(IAmazonS3 s3Client, IConfiguration Configuration)
        {
            this.s3Client = s3Client;
            this.BucketName = Configuration.GetSection("Application").GetSection("S3BucketName").Value;
        }

        //path format (band/16/profile.jpg) or (profile.jpg)
        public async Task<bool> DeleteFile(string filepath)
        {
            try
            {
                bool status = false;
                //int pos = filepath.LastIndexOf("/") + 1;
                //string path = filepath.Substring(pos, filepath.Length)

                var list = await s3Client.ListObjectsAsync(new ListObjectsRequest() { BucketName = BucketName, Prefix = filepath });
                S3Object s3Object = list.S3Objects.FirstOrDefault();
                if (s3Object != null)
                {
                    var res = await s3Client.DeleteObjectAsync(new DeleteObjectRequest() { BucketName = BucketName, Key = s3Object.Key });
                    status = true;
                }
                return status;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        //path format (band/16) or (band)
        public async Task<bool> DeleteFolder(string path)
        {
            try
            {
                bool status = false;
                var list = await s3Client.ListObjectsAsync(new ListObjectsRequest() { BucketName = BucketName, Prefix = path });
                S3Object s3Object = list.S3Objects.FirstOrDefault();
                if (s3Object == null)
                {
                    var res = await s3Client.DeleteObjectAsync(new DeleteObjectRequest() { BucketName = BucketName, Key = s3Object.Key });
                    status = true;
                }

                return status;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        //path format (band/16/profile.jpg) or (profile.jpg)
        public async Task<bool> UploadFile(string filepath, Stream stream)
        {
            try
            {
                int pos = filepath.LastIndexOf("/") + 1;
                string filename = filepath.Substring(pos, filepath.Length - pos);
                string bucketName = BucketName;

                if (pos > 0)
                {
                    string path = filepath.Substring(0, pos - 1);
                    bucketName = BucketName + @"/" + path;
                }

                PutObjectRequest uploadRequest = new PutObjectRequest
                {
                    InputStream = stream,
                    BucketName = bucketName,
                    CannedACL = S3CannedACL.AuthenticatedRead,
                    Key = filename,
                    StorageClass = S3StorageClass.Standard
                };
                var result = await s3Client.PutObjectAsync(uploadRequest);

                return result.HttpStatusCode == System.Net.HttpStatusCode.OK;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        //public void GeneratePreSignedURLforAll(int Id, int expireinHours, string type)
        //{
        //    var list = await s3Client.ListObjectsAsync(new ListObjectsRequest() { BucketName = BucketName, Prefix = type + Id });
        //    S3Object s3Object = list.S3Objects.FirstOrDefault();
        //    if (s3Object == null)
        //    {
        //        var res = await s3Client.DeleteObjectAsync(new DeleteObjectRequest() { BucketName = BucketName, Key = s3Object.Key });
        //        status = true;
        //    }

        //    GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = BucketName + @"/" + type + Id,
        //        Key = filename,
        //        Expires = DateTime.Now.AddHours(expireInHours)
        //    };

        //    urlString = this.s3Client.GetPreSignedURL(request);
        //    return urlString;
        //}
        /// <summary>
        /// P.S. Dec 2017
        /// Give a list of files all starting with the prefix
        /// </summary>
        /// <param name="Prefix">
        /// Begin of path or whole path with file name<para/>
        /// Can be empty
        /// </param>
        /// <returns>List of objects of type S3FileInfo</returns>
        public async Task<List<S3FileInfo>> getS3FileInfo(string Prefix)
        {
            ListObjectsRequest request = new ListObjectsRequest();
            request.BucketName = "luuvamusic";
            request.Prefix = Prefix;
            ListObjectsResponse response = await s3Client.ListObjectsAsync(request);

            List<S3FileInfo> lfi = new List<S3FileInfo>();
            for (int i = 0; i < response.S3Objects.Count; i++)
            {
                S3Object obj = response.S3Objects[i];
                S3FileInfo fi = new S3FileInfo();
                fi.BucketName = obj.BucketName;
                fi.Key = obj.Key;
                fi.Size = obj.Size;
                fi.Url = this.GeneratePreSignedURL(obj.Key, 12);
                lfi.Add(fi);
            }
            lfi = lfi.OrderBy(x => x.Key).ToList();
            return lfi;
        }
        /// <summary>
        /// P.S. Dec 2017
        /// Class holds info about S3 files 
        /// Used as return list by getS3FileInfo
        /// </summary>
        public class S3FileInfo
        {
            public string BucketName;
            public string Key; //Path and filename
            public long Size;
            public string Url;
        }

        //path format (band/16/profile.jpg) or (profile.jpg)
        public string GeneratePreSignedURL(string filepath, int expireInHours)
        {
            try
            {
                string urlString = string.Empty;
                int pos = filepath.LastIndexOf("/") + 1;
                string filename = filepath.Substring(pos, filepath.Length - pos);
                string bucketName = BucketName;

                if (pos > 0)
                {
                    string path = filepath.Substring(0, pos - 1);
                    bucketName = BucketName + @"/" + path;
                }
                GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = filename,
                    Expires = DateTime.Now.AddHours(expireInHours)
                };

                urlString = this.s3Client.GetPreSignedURL(request);
                return urlString;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
