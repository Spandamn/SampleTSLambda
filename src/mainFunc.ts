import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

const addNumbers = function (a: number, b: number): number {
    return a + b;
};

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let eventBody = JSON.parse(event.body || "");
    let c = addNumbers(eventBody.a, eventBody.b);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Sum = ${c}`,
            statusCode: 200,
        }),
    };
};
