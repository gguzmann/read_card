import { Cards } from 'scryfall-api';

// LLAMAR POR NOMBRE: Cards.byName
// LLAMAR Cards.bySet con collector_number y set campos en español
// Cards.autoCompleteName
export const callCard = async (x: string) => {


    console.log(x)
    const card: any = await Cards.byName(x, true)



    const cardEsp = await Cards.bySet(card.set, card.collector_number, 'es')

    return cardEsp?.image_uris?.large

}

export const getAllNames = async (name: string) => {
    console.log('Name:', name)
    const results = await Cards.autoCompleteName(name);

    for (const result of results) {
        console.log(result);

    }
    return results
}