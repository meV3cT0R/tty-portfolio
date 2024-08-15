import HistoryType from "../types/HistoryType";

const History: React.FC<{ history: HistoryType[] }> = ({ history }) => {
    return <div>
        {history.map((dat,index) => {
            return <div className="text-xl" key={index*10*5/4/100+23423}>
                <div className="flex space-x-5 ">
                    <span>~/{dat.loc.join("/")}</span>
                    <p>{dat.cmd}</p>
                </div>
                <span>{dat.output} </span>
            </div>
        })}
    </div>
}

export default History;