type MyArrayType = Array<{id: number, prix: number, nom: string, url: string}>;
export class Categorie {
  constructor(public id: number,
    public nom: string,
    public url: string,
    public produit: MyArrayType) { }
}