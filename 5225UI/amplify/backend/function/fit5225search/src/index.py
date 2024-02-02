from boto3.dynamodb.conditions import Key, Attr
import boto3
import json

dynamodb = boto3.client('dynamodb')
TABLE_NAME = 'Image'

def handler_get(event, context):

    DB = boto3.resource('dynamodb')
    table = DB.Table('Image')
    print(event)
    print(context)
    if event['queryStringParameters'] is not None:
        search_tags = event['queryStringParameters'].values()

    links = []
    
    response = table.scan(
        FilterExpression=Attr('id').gte("0")
    )

    if response['Items'] is not None:
        for x in response['Items']:
            tag_list = x['tags']
            if all([word in tag_list for word in search_tags]) == True:
                links.append(x['s3-url'])
    
    print(links)

    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'links': links})
        }
        
def handler_post(event, context):
    DB = boto3.resource('dynamodb')
    table = DB.Table('Image')
    print(event)
    print(context)
    body = json.loads(event['body'])
    key = body['key']
    type = body['type']
    tags = body['tags']

    response = table.scan(
        FilterExpression=Attr('id').gte("0")
    )

    if response['Items'] is not None:
        print(response['Items'])
        for x in response['Items']:
            if x['s3-url'].endswith(key):
                if type == 1: # add
                    for i in range(tags['count']):
                        print(x)
                        x['tags'].append(tags['tag'])
                else: #del
                    l = []
                    count = tags['count']
                    for item in x['tags']:
                        if item == tags['tag'] and count > 0:
                            count = count - 1
                            continue
                        l.append(item)
                    x['tags'] = l
                data = {}
                data['id'] = {'S': x['id']}
                tags = []
                for tag in x['tags']:
                    dict = {}
                    dict['S'] = tag
                    tags.append(dict)
                data['tags'] = { "L" : tags}
                data['s3-url'] = {'S': x['s3-url']}
                print(data)
                response = dynamodb.put_item(TableName=TABLE_NAME, Item=data)
    else:
        print("Items is None")
    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': 'success'
        }
def handler_delete(event, context):
    key = event['queryStringParameters']['etag']
    paginator = dynamodb.get_paginator('scan')
    for page in paginator.paginate(TableName=TABLE_NAME):
        for item in page['Items']:
            field_value = item['s3-url']['S']
            # Check if the field value ends with the match string
            if field_value.endswith(key):
                # Delete the item from the table
                key = {'id': {'S': item['id']['S']}}
                dynamodb.delete_item(TableName=TABLE_NAME, Key=key)
                return {
                    'statusCode': 200,
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': 'success'
                }
    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': 'fail'
        }
        
def handler_put(event, context) 
    event['body'].de
    pass

def lambda_handler(event, context):
    print(event)
    print(context)
    http_method = event["httpMethod"]
    if http_method == 'GET':
        return handler_get(event, context)
    elif http_method == 'POST':
        return handler_post(event, context)
    elif http_method == 'DELETE':
        return handler_delete(event, context)
    elif http_method == 'PUT':
        return handler_put(event, context)        
    else:
        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }