import os
import re
import cv2
from PIL import Image, ImageDraw

assets_folder = "/home/karthik-unni/Karthik/Task10/assets"

def image_number(filename):
    match = re.search(r'\d+', filename)
    if match:
        return int(match.group())
    else:
        return float('inf')  i
image_files = sorted([f for f in os.listdir(assets_folder) if f.endswith('.png')],
key=image_number)

dots_info = []

for image_file in image_files:
    image_path = os.path.join(assets_folder, image_file)
    image = cv2.imread(image_path)
    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray_image, 240, 255, cv2.THRESH_BINARY_INV)
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        contour = max(contours, key=cv2.contourArea)
        M = cv2.moments(contour)
        
        if M['m00'] != 0:
            cx = int(M['m10'] / M['m00'])
            cy = int(M['m01'] / M['m00'])
            
            dot_color = image[cy, cx]
            dot_color = (int(dot_color[2]), int(dot_color[1]), int(dot_color[0]))  # Convert to RGB
            
            dots_info.append((cx, cy, dot_color))
        else:
            dots_info.append(None)
    else:
        dots_info.append(None)

canvas = Image.new("RGB", (512, 512), "white")
draw = ImageDraw.Draw(canvas)

for i in range(1, len(dots_info)):
    if dots_info[i - 1] and dots_info[i]:
        draw.line([dots_info[i - 1][:2], dots_info[i][:2]], fill=dots_info[i - 1][2], width=2)

output_path = "/home/karthik-unni/Karthik/Task10/hi.png"
canvas.save(output_path)
