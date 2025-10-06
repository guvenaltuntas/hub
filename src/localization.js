export default class Localization{
    constructor(){
        this.languageSource = {};
        this.languageKey = '';
    }

    get(key, data){
        if (!data || data && data.length == 0) {
            return this.languageSource[key] || key || '';
        }

        let result = this.languageSource[key] || key || '';
        //lets use standart for loop in here 
        for (let i = 0; i < data.length; i ++) {
            let source = new RegExp('\\{' + i + '\\}','gi');
            result = result.replace(source, data[i]);
        }
        return result;
    }

    setLanguageSource(languageSource) {
        this.languageSource = languageSource;
    }

    setLanguageKey(key){
        this.languageKey = key;
    }

    getLanguageKey(){
        return this.languageKey;
    }

    changeLanguage(newLanguage){
        return new Promise((resolve)=>{
            if (newLanguage != this.languageKey) {
                import(`./language/${newLanguage}.json`).then((languageSource)=>{
                    this.setLanguageSource(languageSource?.default);
                    this.setLanguageKey(newLanguage);
                    resolve();
                });
            } else {
                resolve();
            }
        });
        
    }
}

export const localization = new Localization();