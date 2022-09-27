import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    let a: number, b: number;
    let eventBody = JSON.parse(event.body);
    let c = eventBody.a + eventBody.b;
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Sum = ${c}`,
            statusCode: 200,
        }),
    };
};