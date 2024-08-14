import { Cards } from 'scryfall-api';

// LLAMAR POR NOMBRE: Cards.byName
// LLAMAR Cards.bySet con collector_number y set campos en español
// Cards.autoCompleteName
export const callCard = async (x: string) => {


    console.log(x)
    try {

        const card: any = await Cards.byName(x, true)
        console.log('card', card)
        const cardEsp = await Cards.bySet(card.set, card.collector_number, 'es')
        console.log('cardEs', cardEsp)
        if (!cardEsp) {
            throw new Error('Card not found in set');
        }
        return cardEsp?.image_uris?.large

    } catch (error) {
        console.log('error 1')
        return 'error'
    }



}

export const getAllNames = async (name: string) => {
    console.log('Name:', name)
    const results = await Cards.autoCompleteName(name);

    for (const result of results) {
        console.log(result);

    }
    return results
}