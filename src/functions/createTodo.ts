import { dynamoDB } from "../database/dynamoDBClient";
import { v4 } from "uuid";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { userId } = event.pathParameters;

  const result = await dynamoDB.put({
    TableName: 'todos',
    Item: {
      id: v4(),
      user_id: userId,
      title: title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(result),
    headers: {
      "Content-Type": "application/json"
    },
  }
}