import { useEffect , useState} from "react";
import { Container } from "@mui/material";

import MemoCard from "../comps/MemoCard";
import Masonry from 'react-masonry-css'

import '../App.css'

const Memos = () => {
    const [memos, setMemos] = useState([])
    const track = 0
    useEffect(() => {
        fetch('http://localhost:10000/memos/')
            .then((res) => res.json())
            .then((data) => setMemos(data))
    }, [track]);

    const handleDelete = async (id) => {
        await fetch('http://localhost:10000/memos/'+ id, {
            method: 'DELETE',
        })

        setMemos(memos.filter((memo) => memo._id !== id))
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
        600: 2,
        490: 1
    }
    return (
        <Container 
            sx={{
                marginTop: 3
            }}
        >
            <Masonry 
                breakpointCols={breakpoints} 
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {memos.map((memo) => (
                    <div  key={memo._id} >
                        <MemoCard handleDelete={handleDelete} memo={memo}/>
                    </div>
                ))}
            </Masonry>
            
        </Container>
    );
}
 
export default Memos;