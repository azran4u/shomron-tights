import os

from utils.cloud_storage_utils import (
    create_gcs_bucket,
    delete_gcs_bucket,
    upload_bytes_to_cloud_storage,
    upload_folder_content_to_cloud_storage,
)
from utils.image_utils import downscale_image, downscale_images
from utils.filesystem_utils import delete_local_folder_and_content


def upload_images():
    images_path_input = "~/Downloads/tights-shomron-images"
    images_path_output = images_path_input + "uploaded"
    delete_local_folder_and_content(images_path_output)
    downscale_images(images_path_input, images_path_output)
    bucket_name = "shomron-tights-images"
    delete_gcs_bucket(bucket_name)
    create_gcs_bucket(bucket_name)
    upload_folder_content_to_cloud_storage(bucket_name, images_path_output)


def upload_single_image():
    local_path = os.path.join(os.path.dirname(__file__), "image.jpg")
    folder_name = "תחרה צמות"
    hebrew_color = "שמנת"
    blob_name = f"{folder_name}/mobile_{hebrew_color}.jpg"
    bucket_name = "shomron-tights-images"
    data = downscale_image(local_path)
    upload_bytes_to_cloud_storage(bucket_name, data, blob_name, overwrite=True)
