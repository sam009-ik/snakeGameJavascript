from PIL import Image

# Load the image
img_path = 'snake.jpg'
img = Image.open(img_path)

# Remove white border by cropping the image
# Since the white border size is not specified, let's assume a small border for demonstration
border_to_remove = 10  # This is an arbitrary value, adjust as needed

# Calculate the box to use for cropping
left = border_to_remove
upper = border_to_remove
right = img.width - border_to_remove
lower = img.height - border_to_remove
crop_box = (left, upper, right, lower)

# Crop the image to remove the border
cropped_img = img.crop(crop_box)

# Resize the image to be appropriate for a logo (let's assume 100x100 pixels)
logo_size = (180, 180)
logo_img = cropped_img.resize(logo_size, Image.Resampling.LANCZOS)

# Save the processed image
processed_img_path = 'snake-logo-processed.jpg'
logo_img.save(processed_img_path)

# Return the path to the saved image
processed_img_path
