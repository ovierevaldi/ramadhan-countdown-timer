export type SelectedBahasa = 'Indonesia' | 'English';

const ContextLanguage = () => {

    function getCountdown(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'Countdown';
        else
            return 'Hitung Mundur'
    };

    function getDays(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'Days';
        else
            return 'Hari'
    };

    function getHours(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'Hours';
        else
            return 'Jam'
    };

    function getMinutes(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'Minutes';
        else
            return 'Menit'
    };

    function getSeconds(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'Seconds';
        else
            return 'Detik'
    };

    function getParagraph1(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'For Indonesian territory based on available information.';
        else
            return 'Untuk wilayah Indonesia berdasarkan Informasi yang tersedia'
    };

    function getParagraph2(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'The official setting of the beginning of Ramadan by the government will be confirmed through the isbat conference held before the month of Ramadan';
        else
            return 'Penetapan resmi awal Ramadan oleh pemerintah akan dikonfirmasi melalui sidang isbat yang diadakan menjelang bulan Ramadan.'
    };

    function getCelebrationText(bahasa: SelectedBahasa){
        if(bahasa === 'English')
            return 'It\'s Ramadhan Time!';
        else
            return 'Saatnya Ramadhan!'
    }

    return {getCountdown, getDays, getHours, getMinutes, getSeconds, getParagraph1, getParagraph2, getCelebrationText}
};

export default ContextLanguage