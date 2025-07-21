import RegularButton from "@/components/RegularButton"

interface Data {
    id: number,
    description: string
}

interface DescriptionBlockProps {
    data: Data
}

function DescriptionBlock({ data }: DescriptionBlockProps) {
    return (
        <div className='green_rectangle vertical_container' id='description_display'>
            <h1 className='medium_heading'>Опис</h1>

            <p className='small_text' id='description_text'>
                {/* Ігровий комп'ютер купував 3 місяці тому в ідеальному стані,пломби на місці,коробки все є. У корпусі 6 кулерів. Комп'ютер на гарантії в магазині “Brain”, так само окрема гарантія на всі запчастини.
                Характеристики:
                Відеокарта: RTX 4060 ti 8 GB, Gigabyte Aero (біла)
                Процесор: Ryzen 5 7500f
                Материнська плата: MB gigabyte B650M DS3H sAM5 ddr5
                Оперативна пам'ять: Kingston fury 32GB ddr5 (2x16) 5600 MHz
                Блок живлення: Vinga 650W 80PLUS gold */}
                {data.description}
            </p>

            <div className='horizontal_container' id='report_container'>
                <span className='small_text'>ID: {data.id}</span>

                <RegularButton className='report_button' text='Поскаржитися' onClick={report} />
            </div>
        </div>
     );
    function report(){
        console.log("report clicked")
    }
}

export default DescriptionBlock;