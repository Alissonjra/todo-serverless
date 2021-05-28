import { APIGatewayProxyHandler } from "aws-lambda"
import { dynamoDB } from "../database/dynamoDBClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  
  const response = await dynamoDB.scan({
    TableName: 'todos',
    FilterExpression: '#u_id = :value',
    ExpressionAttributeNames: {
        '#u_id': 'user_id'
    },
    ExpressionAttributeValues: {
        ':value': userId
    },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
    headers: {
      "Content-Type": "application/json"
    },
  }
}