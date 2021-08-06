This task consists of deploying a customized Torchserve Docker image using Amazon Web 
Services (AWS) and communicating through HTTP requests from a frontend web application.

The Docker image provided contains the Densenet161​pre-trained model pre-loaded. This
model takes as input an image (in jpeg or png format) and returns a JSON object.

The final user will be able to make inferences to the model, uploading any image, and to receive
some predictions about their contents.
This task should be subdivided into two parts: backend and frontend.

Frontend:
The frontend web application is written in React. User should be capable of uploading an image, 
showing the results, and calculating the score table from the prediction result.