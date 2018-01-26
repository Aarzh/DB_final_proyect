export class Mission{
    constructor(
        public _id: number,
        public number: string,
        public alias: string,
        public loc: string,
        public fecha: string,
        public state: string,
        public file: string,
        public caso: string
    ){}
}
