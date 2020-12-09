### 排序
1. 冒泡排序 两两比较
最坏情况下 时间复杂度为O(n²) 最好为O(n) 平均时间复杂度为O(n²)
```
const bubbleSort = (arr) => {
  const len = arr.len
  for(let i = 0; i< len -1 ; i++) {
    for(let j = 0; j< len - i -1; j++) {
      if(arr[j] >  arr[j+1]){
        const temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
}
```
2. 选择排序 先选出最小的放在前面 然后依次
时间复杂度为O(n²)
```
const selectionSort = (arr) => {
  const len = arr.length
  let minIndex
  for(let i =0 ; i< len - 1 ; i++) {
    minIndex = i
    for(let j = i +1; j < len - 1; j++) {
      if(arr[j] < arr[minIndex]){
        minIndex = j
      }
    }
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```
3. 插入排序 与前面对比 放置
时间复杂度为O(n²) 最好为O(n) 平均时间复杂度为O(n²)
```
const insertionSort = (arr) =>{
  const len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while(preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex+1] = arr[preIndex];
          preIndex--;
      }
      arr[preIndex+1] = current;
  }
  return arr;
}
```


