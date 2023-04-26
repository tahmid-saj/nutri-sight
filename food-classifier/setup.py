import setuptools

long_description = "Food_Classifier"

with open("requirements.txt", "r") as requirements_file:
    external_packages = requirements_file.read()

setuptools.setup(
    name="Food_Classifier",
    version="0.0.1",
    author="tahmid-saj",
    description="Repo containing computer vision projects ranging from object detection, movement detection and tracking to image classification using OpenCV and TensorFlow.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    project_urls={
        "Bug Tracker": "",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    install_requires = external_packages,
    package_dir={"":"src"},
    packages=setuptools.find_namespace_packages(where="src\\"),
    include_package_data=True,
    python_requires=">=3.7",
)