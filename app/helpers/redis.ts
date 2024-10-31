const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = 'zrange' | 'sismember' | 'get' | 'smembers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchRedis(command: Command, ...args: (string | number)[]): Promise<any | null> {
    if (!upstashRedisRestUrl || !authToken) {
        console.error("Missing Upstash Redis URL or Auth Token in environment variables");
        return null;
    }

    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`;

    try {
        const response = await fetch(commandUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Error executing Redis command "${command}": ${response.statusText}`);
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (await response.json()) as { result: any };
        return data.result;
    } catch (error) {
        console.error("FetchRedis error:", error);
        return null;
    }
}
