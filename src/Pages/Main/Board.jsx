import Header from 'Components/Header';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { postList, board_status, getBoardById } from 'redux/slices/BoardSlice';

import List from './List';

const Board = () => {
    const dispatch = useDispatch();
    const { data: userData } = useSelector((state) => state.UserReducer);
    const { data, status } = useSelector((state) => state.BoardReducer);

    const params = useParams();

    React.useEffect(() => {
        dispatch(getBoardById({ boardId: params.id, userId: userData.id }));
    }, [params]);

    const [createListShow, setCreateListShow] = React.useState(false);
    const [newName, setNewName] = React.useState('');

    const handleSubmitCreateList = (event) => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(postList({ boardId: params.id, listName: newName }));
            setCreateListShow(false);
        } else {
            console.log('invalid');
        }

        setNewName('');
    };

    return (
        <>
            {status === board_status.loading && <h1>Loading...</h1>}
            {status === board_status.error && <h1>Error occured :(</h1>}
            {status === board_status.success && (
                <div className="flex flex-col h-full">
                    <Header />
                    <div className="grow h-full flex flex-col bg-slate-400">
                        <div className="flex justify-between items-center px-4 ">
                            <div>
                                <h2 className="p-3">{data?.name}</h2>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="p-3">Active users</div>
                                <button type="button" className="p-3">
                                    Menu Button
                                </button>
                            </div>
                        </div>

                        <div className="grow px-4 w-full flex gap-6 items-start overflow-x-auto select-none ">
                            {data?.lists.map((item, id) => (
                                <List key={item.listId} list={item} />
                            ))}

                            <div className="bg-slate-300 min-w-[15rem]">
                                {createListShow ? (
                                    <div className="flex flex-col gap-4 p-4 ">
                                        <form
                                            className="flex flex-col gap-2"
                                            onSubmit={handleSubmitCreateList}>
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Enter new list name"
                                                className="input-default"
                                                onChange={(event) => setNewName(event.target.value)}
                                                value={newName}
                                            />
                                            <div>
                                                <button type="submit" className="w-2/3 btn-filled">
                                                    Create list
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-1/3 btn-underline"
                                                    onClick={() => {
                                                        setCreateListShow(false);
                                                        setNewName('');
                                                    }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn-no-fill w-full p-3"
                                        onClick={() => setCreateListShow(true)}>
                                        + Add a list
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Board;
