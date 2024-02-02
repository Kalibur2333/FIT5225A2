This folder contains all third party config


Note that :

A. config all files can not be passed, import.meta.env to get the environment variables, will report an error, to use the environment variables in the config file, can only be passed in through vite-config-ts, passed to the config file through configEnv, then the config file, it must be written in the form of a function

B. The  Lambda function only can edit images by tag in DynamoDB. Use DynamoDB Streams when working with records (images) in Amazon DynamoDB Streams with the Lambda function in AWS, and after each update of the DynamoDB table, the user can trigger the Lambda function to perform more operations(Erdoğan & Niyazi, 2019). Lambda can read records from a stream and synchronise calls to your used functions with an event containing the stream records. In addition Lambda reads records in batches and calls your function to process all records in the batch.
