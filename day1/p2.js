import load from '../util/load.js';
export default undefined;

const nums = load(1).split('\n').map(x => +x.trim());

for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        for (let k = j + 1; k < nums.length; k++) {
            if (nums[i] + nums[j] + nums[k] === 2020) {
                console.log(nums[i]*nums[j]*nums[k]);
            }
        }
    }
}
