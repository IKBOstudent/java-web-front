import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const axiosMockInstance = axios.create();

export const mock = new AxiosMockAdapter(axiosMockInstance, {
    delayResponse: 500,
});

const mockUsers = [
    {
        id: 'aNIxnO_XyYN175dvNo38S',
        username: 'username 1',
        boards: [
            { boardId: 'PtSGAEw5fUt7Q-Dky725i', boardName: 'Board first' },
            { boardId: 'oCRrQElDoLGzwuopp57lJ', boardName: 'Board second' },
        ],
    },
];

const mockBoards = [
    {
        id: 'PtSGAEw5fUt7Q-Dky725i',
        userId: 'aNIxnO_XyYN175dvNo38S',
        name: 'Board first',
        lists: [
            {
                listId: 'osFPGYb254JyTHSgIkKku',
                listName: 'List 1',
                cards: [
                    {
                        cardId: 'jHY-gxrARhqSVqfOO_WJt',
                        cardName: 'Card 1',
                    },
                ],
            },
            {
                listId: '_HSBlD4metq2C0J8hPndM',
                listName: 'List 2',
                cards: [
                    {
                        cardId: 'IGn94aATIIqfgU7bUqI7s',
                        cardName: 'Card 1',
                    },
                ],
            },
            {
                listId: 'gSfAgGmvZL46YvSTxRTV3',
                listName: 'List 3',
                cards: [
                    {
                        cardId: '-M9j7-uBn465DSUuTp5yW',
                        cardName: 'Card 1',
                    },
                    {
                        cardId: '8zeQEzp9qTSX_RgcX4L_b',
                        cardName: 'Card 2',
                    },
                ],
            },
        ],
    },
    {
        id: 'oCRrQElDoLGzwuopp57lJ',
        userId: 'aNIxnO_XyYN175dvNo38S',
        name: 'Board second',
        lists: [
            {
                listId: 'HVr973QV1ni2Hy9o0MgL7',
                listName: 'List 1',
                cards: [
                    {
                        cardId: '5ylh0M1Lk7ohT1fROTJ4V',
                        cardName: 'Card 1',
                    },
                ],
            },
            {
                listId: '1PWM1lyiFgKhrjFSlvvEN',
                listName: 'List 2',
            },
        ],
    },
];

// user
mock.onGet('/users').reply((config) => {
    console.log('get user', config);
    const foundUser = mockUsers.find((item) => item.id === config.userId);
    if (foundUser) {
        return [200, foundUser];
    } else {
        return [404, config.userId];
    }
});

mock.onPost('/boards').reply((config) => {
    console.log('post board', config.data);
    const { userId, boardName } = JSON.parse(config.data);

    const newBoard = { boardId: nanoid(), boardName };
    const foundUser = mockUsers.find((item) => item.id === userId);
    if (foundUser) {
        foundUser.boards.push(newBoard);
        console.log(mockUsers);
        mockBoards.push({
            id: newBoard.boardId,
            userId: userId,
            name: boardName,
            lists: [],
        });
        return [200, newBoard];
    } else {
        return [404, { userId, boardName }];
    }
});

mock.onDelete('/boards').reply((config) => {
    console.log('delete board', config.boardId);
    const { userId, boardId } = config;

    const foundUser = mockUsers.find((item) => item.id === userId);
    if (foundUser) {
        foundUser.boards = foundUser.boards.filter((item) => {
            return item.boardId !== boardId;
        });
        mockBoards.filter((item) => item.id !== boardId);

        return [200, { userId, boardId }];
    } else {
        return [404, { userId, boardId }];
    }
});

// board
mock.onGet('/boards').reply((config) => {
    console.log('get board', config.boardId);
    const { boardId, userId } = config;
    const foundBoard = mockBoards.find((item) => item.id === boardId);
    if (foundBoard && foundBoard.userId === userId) {
        return [200, foundBoard];
    } else {
        return [404, { boardId, userId }];
    }
});

mock.onPost('/lists').reply((config) => {
    console.log('post list', config);
    const { boardId, listName } = JSON.parse(config.data);

    const newList = { listId: nanoid(), listName, cards: [] };
    const foundBoard = mockBoards.find((item) => item.id === boardId);
    if (foundBoard) {
        foundBoard.lists.push(newList);
        console.log(mockBoards);
        return [200, newList];
    } else {
        return [404, { boardId, listName }];
    }
});

mock.onPost('/cards').reply((config) => {
    console.log('post card', config);
    const { listId, cardName } = JSON.parse(config.data);

    const newCard = { cardId: nanoid(), cardName };
    let foundList = {};
    mockBoards.forEach((item) => {
        const found = item.lists.find((item) => item.listId === listId);
        if (found) foundList = found;
    });
    if (foundList) {
        foundList.cards.push(newCard);
        return [200, { listId, newCard }];
    } else {
        return [404, { listId, cardName }];
    }
});

mock.onDelete('/cards').reply((config) => {
    console.log('delete card', config.cardId);
    const { listId, cardId } = config;
    let foundList = {};
    mockBoards.forEach((item) => {
        const found = item.lists.find((item) => item.listId === listId);
        if (found) foundList = found;
    });
    if (foundList) {
        console.log(foundList);
        foundList.cards = foundList.cards.filter((item) => {
            return item.cardId !== cardId;
        });
        console.log(foundList);

        return [200, { listId, cardId }];
    } else {
        return [404, { listId, cardId }];
    }
});

mock.onDelete('/lists').reply((config) => {
    console.log('delete list', config.listId);
    const { boardId, listId } = config;
    const foundBoard = mockBoards.find((item) => item.id === boardId);
    if (foundBoard) {
        foundBoard.lists = foundBoard.lists.filter((item) => {
            return item.listId !== listId;
        });

        return [200, { boardId, listId }];
    } else {
        return [404, { boardId, listId }];
    }
});

export default axiosMockInstance;
