import React from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/slices/BoardSlice';
import Card from './Card';

const List = ({ list }) => {
    const dispatch = useDispatch();

    const [isCreateCard, setCreateCard] = React.useState(false);
    const [newName, setNewName] = React.useState('');

    const handleSubmitCreateCard = (event) => {
        event.preventDefault();

        if (newName.length > 0) {
            dispatch(addCard({ id: list.listId, name: newName }));
            setCreateCard(false);
        } else {
            console.log('invalid');
        }

        setNewName('');
    };

    return (
        <div className="max-w-[18rem] w-full h-fit flex flex-col p-4 gap-4 bg-white ">
            <h3 className=" px-2 text-lg font-medium">{list.listName}</h3>
            <div className="flex flex-col gap-4">
                {list.cards.map((item, id) => (
                    <Card key={item.cardId} name={item.cardName} />
                ))}
            </div>

            {isCreateCard ? (
                <div className="flex flex-col gap-4 p-3 bg-slate-200 w-full">
                    <form className="flex flex-col gap-2" onSubmit={handleSubmitCreateCard}>
                        <input
                            type="text"
                            placeholder="Enter card title"
                            className="appearance-none border border-slate-400 p-1 focus:outline-none focus:border-slate-600 placeholder:text-sm"
                            onChange={(event) => setNewName(event.target.value)}
                            value={newName}
                        />
                        <div className="flex items-center">
                            <button
                                type="submit"
                                className=" bg-slate-800 w-2/3 hover:bg-slate-900 text-white py-2 px-4">
                                Create card
                            </button>
                            <button
                                type="button"
                                className="text-sm w-1/3 text-center text-gray-600 hover:underline"
                                onClick={() => {
                                    setCreateCard(false);
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
                    className="button bg-slate-200 w-full p-3"
                    onClick={() => setCreateCard(true)}>
                    + Add a card
                </button>
            )}
        </div>
    );
};

export default List;
