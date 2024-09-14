# Approach

The above task was to  identify all the dots in eash of the given images and draw a linw connecting these dots to form an image.<br>
The OpenCv module is used for image processing tasks like reading images .<br>
The Pillow (PIL) Module is used for drawing on images ,in this case connecting the dots.<br>
Using cv2 function for each image coverted to greyscale and found countours.Then the coordinates were assigned and the dots were drawn.<br>
The image with connected dots were stored in a new .png file.
