import HistoryType from "../types/HistoryType";

const History: React.FC<{ history: HistoryType[] }> = ({ history }) => {
    return <div>
        {history.map((dat, index) => {
            return <div className="" key={index * 10 * 5 / 4 / 100 + 23423}>
                {dat.loc && 
                dat.cmd && 
                <div className="flex flex-wrap space-x-2 md:space-x-5 ">
                    <span>~/{dat.loc.join("/")}</span>
                    <p>{dat.cmd}</p>
                </div>
                }
                <span>{dat.output} </span>
            </div>
        })}
    </div>
}

export default History;