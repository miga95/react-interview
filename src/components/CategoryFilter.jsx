import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectCategories } from '../redux';

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const availableCategories = useSelector(selectCategories);
  const selectedCategories = useSelector((state) => state.movie.selectedCategories);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      dispatch(selectCategory([...selectedCategories, category]));
    } else {
      dispatch(selectCategory(selectedCategories.filter((c) => c !== category)));
    }
  };

  return (
    <div className='w-1/2 m-auto flex flex-col'>
      <div className='flex flex-wrap m-auto justify-center'>
        {availableCategories.map((category) => (
            <div key={category} className="flex items-center mr-2">
                <div className="form-control">
                    <label className="label cursor-pointer" htmlFor={category}>
                        <span className="label-text">{category}</span> 
                        <input  
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={handleCategoryChange}
                            className='mx-1' 
                        />
                    </label>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
