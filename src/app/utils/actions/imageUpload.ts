'use server';
import type { UploadApiResponse } from 'cloudinary';
import cloudinary from '@/lib/cloudinary';

export async function imageUploader(file: File) {
  const buffer: Buffer = Buffer.from(await file.arrayBuffer());
  try {
    const upload: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ upload_preset: 'sefest' }, (error, uploadResult) => {
            if (error) reject(error);
            return resolve(uploadResult);
          })
          //@ts-expect-error cloudinary types
          .end(buffer?.data ? buffer.data : buffer);
      }
    );

    if (!upload)
      return {
        success: false,
        message: 'An error occurred while uploading the image'
      };

    return {
      success: true,
      message: 'Upload successful',
      url: upload.secure_url
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while uploading the image'
    };
  }
}

export async function handleImageDelete(filename: string) {
  try {
    //@ts-expect-error filename splitting
    const publicId = filename.split('/').pop().split('.')[0];
    const deleteResult = await cloudinary.uploader.destroy(publicId);

    if (deleteResult.result === 'ok') {
      return { success: true, message: 'Image deleted successfully.' };
    } else {
      throw new Error('Failed to delete image.');
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while deleting the image'
    };
  }
}
