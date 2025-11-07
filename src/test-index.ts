import { EverybodyCodesClient, getData } from "./index.js";

const demo = async () => {
    const sessionCookie = 'baef420b-62d9-49df-8f23-6b2abea14236'
// Variante A – direkter Client
    const client = new EverybodyCodesClient(sessionCookie);
    const data = await client.getEventData("2025",1 );
    console.log(data);

    const part1Data = await client.getEventPartData("2024",1,1);
    console.log(part1Data);


// Variante B – Einzeiler
    /*const data2 = await getData(sessionCookie, "2024", 1);
    console.log(data2);*/
}

demo()
