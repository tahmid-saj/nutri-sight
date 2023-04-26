import tensorflow as tf
import os
import numpy as np
import pandas as np
from matplotlib import pyplot as plt
import tensorflow_datasets as tfds
from tensorflow.keras import mixed_precision
from tensorflow.keras import layers

import datetime

print(tf.__version__)
INPUT_SHAPE = (224, 224, 3)

datasets_list = tfds.list_builders()
print("food101" in datasets_list)

# Image data loading
(train_data, test_data), ds_info = tfds.load(name="food101",
                                             split=['train', 'validation'],
                                             shuffle_files=True,
                                             as_supervised=True,
                                             with_info=True)

class_names = ds_info.features['label'].names
print(len(class_names))

# Data exploration

train_one_sample = train_data.take(1)
print(train_one_sample)

for image, label in train_one_sample:
    print(f"""Image shape: {image.shape}
    Image dtype: {image.dtype}
    Target class from Food101 (tensor form): {label}
    Class name (str form): {class_names[label.numpy()]}""")

plt.imshow(image)
plt.title(class_names[label.numpy()])
plt.axis(False)

# Data preprocessing

def preprocess_img(image, label, img_shape=224):
    """
    Converts images to dtype float32, and reshapes images to
    (img_shape, img_shape, channels)
    """
    image = tf.image.resize(image, [img_shape, img_shape])
    
    return tf.cast(image, tf.float32), label

checkpoint_path = "model_checkpoints/cp.ckpt"
model_checkpoint = tf.keras.callbacks.ModelCheckpoint(checkpoint_path,
                                                      monitor="val_accuracy",
                                                      save_best_only=True,
                                                      save_weights_only=True,
                                                      verbose=0)

early_stopping = tf.keras.callbacks.EarlyStopping(monitor="val_loss",
                                                  patience=3)

checkpoint_path = "fine_tune_checkpoints/"
model_checkpoint = tf.keras.callbacks.ModelCheckpoint(checkpoint_path,
                                                      save_best_only=True,
                                                      monitor="val_loss")

reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(monitor="val_loss",
                                                 factor=0.2,
                                                 patience=2,
                                                 verbose=1,
                                                 min_lr=1e-7)

preprocessed_img = preprocess_img(image, label)[0]
print(f"Image before preprocessing:\n {image[:2]}...,\nShape: {image.shape},\nDatatype: {image.dtype}\n")
print(f"Image after preprocessing:\n {preprocessed_img[:2]}...,\nShape: {preprocessed_img.shape},\nDatatype: {preprocessed_img.dtype}")

plt.imshow(preprocessed_img / 255.)
plt.title(class_names[label])
plt.axis(False)

train_data = train_data.map(map_func=preprocess_img, num_parallel_calls=tf.data.AUTOTUNE)
train_data = train_data.shuffle(buffer_size=1000).batch(batch_size=32).prefetch(buffer_size=tf.data.AUTOTUNE)

test_data = test_data.map(preprocess_img, num_parallel_calls=tf.data.AUTOTUNE)
test_data = test_data.batch(32).prefetch(tf.data.AUTOTUNE)