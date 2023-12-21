import cv2
import numpy as np
import tensorflow as tf
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Load the saved model
model = tf.keras.models.load_model('./model')

image=cv2.imread(str('./uploads/testpic.jpg'))
resized_img = cv2.resize(image, (128, 128))

# Use the model to predict the image class
logits=model.predict(resized_img[np.newaxis,...])
activations=tf.nn.softmax(logits)
prediction = np.argmax(activations,axis=1)[0]
classes={
    0:'rose',
    1:'tulips',
    2:'sunflowers',
    3:'daisy',
    4:'dandelion'
}
print(classes[prediction])
