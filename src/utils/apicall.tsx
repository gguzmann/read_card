import { Cards } from 'scryfall-api';

// LLAMAR POR NOMBRE: Cards.byName
// LLAMAR Cards.bySet con collector_number y set campos en español
// Cards.autoCompleteName
export const callCard = async () => {



    const card: any = await Cards.byName('Battering Sliver', true)



    const cardEsp = await Cards.bySet(card.set, card.collector_number, 'es')

    return cardEsp?.image_uris?.large

}

export const getAllNames = async () => {
    const results = await Cards.autoCompleteName('Sliver');

    for (const result of results) {
        console.log(result);

    }
}