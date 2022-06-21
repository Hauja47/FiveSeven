export default function getLocale(){
    let language = navigator.language

    console.log(language);
    console.log(language&&language.length === 2);
    return language&&language.length === 2 ? language.split('-'):['en', 'VN']
}