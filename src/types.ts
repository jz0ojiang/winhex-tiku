export interface dblist {
  id: number | string;
  label: string;
  config: string;
}


export interface dbdetail {
    id:    string;
    label: string;
    links:  {
        name: string;
        url?:  string|string[];
        urls?: {name: string, url: string}[]
    }[];
    desc?: {
        tags?: string|string[];
        order?: string|string[];
        desc?: string|string[];
        source?: {
            name: string;
            url: string;
        };
    };

}
