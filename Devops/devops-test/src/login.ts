import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcryptjs';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodb = new DynamoDB({ region: 'eu-west-2' });
const userTable = "LoginDB";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log("Inside login handler");
    try {
        // Parse the request body
        const requestBody = JSON.parse(event.body || '');
        console.log(JSON.stringify(requestBody));
        const email = requestBody.email;
        const password = requestBody.password;

        // Check if the provided email exists in the DynamoDB table
        const userData = await dynamodb.getItem({
            TableName: userTable,
            Key: {
                "email": { "S": email }
            }
        }).promise();
        /*return {
            statusCode: 200,
            body: JSON.stringify(userData)
        };*/
        if (!userData.Item) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid email or password.' }),
            };
        }

        // Compare the hashed password using bcrypt
        const hashedPasswordInDB = userData.Item.password.S;
        const passwordMatch = await bcrypt.compare(password, hashedPasswordInDB);

        if (passwordMatch) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Login successful!' }),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid email or password.' }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
