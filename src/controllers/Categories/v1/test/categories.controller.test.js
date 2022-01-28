const Categories = require('../../../../models/Categories');
const { getCategories, postCategories } = require('../categories.controller');

describe('categories controller', () => {
  beforeAll(() => {
    const mock = jest.spyOn(Categories, 'find');
    mock.mockResolvedValue([
      { title: 'Food', icon: 'star', name: 'food', type: 'expense' },
      { title: 'Salary', icon: 'salary', name: 'salary', type: 'income' }
    ]);

    const mockSave = jest.spyOn(Categories.prototype, 'save');
    mockSave.mockResolvedValue({
      title: 'Shopping',
      icon: 'shopping',
      name: 'shopping',
      type: 'expense'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the categories list by calling getCategories', async () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await getCategories({}, res, jest.fn());
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      expense: [{ title: 'Food', icon: 'star', name: 'food', type: 'expense' }],
      income: [
        { title: 'Salary', icon: 'salary', name: 'salary', type: 'income' }
      ]
    });
  });

  it('should post the category into the categories collection', async () => {
    const req = {
      body: {
        title: 'Shopping',
        icon: 'shopping',
        name: 'shopping',
        type: 'expense'
      }
    };
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await postCategories(req, res, jest.fn());
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
