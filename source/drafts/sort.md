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
4. 希尔排序   间隔比较
时间复杂度 最好 平均 O(nlogn) 最坏 O(nlog²n)
```
const shellSort = (arr) => {
  const len = arr.length
  for(let gap = Math.floor(len /2); gap > 0; gap = Math.floor(gap/2)){
    for(let i = gap; i< len; i++) {
      for(let j = i - gap; j >= 0 && arr[j] > arr[j+gap] ; j-=gap){
        console.log(arr[j] > arr[j+gap])
        let temp = arr[j];
        arr[j] = arr[gap + j];
        arr[gap + j] = temp;
      }
    }
  }
  console.log(arr);
}
```
5. 归并排序
时间复杂度 O(nlogn)
```
const merge = (left, right) =>{
  const　result=[];
  while(left.length>0 && right.length>0){
      if(left[0]<right[0]){
          result.push(left.shift());
      }else{
          result.push(right.shift());
      }
  }
  return　result.concat(left).concat(right);
}

const mergeSort = (arr) => {
  console.log(arr)
  if(arr.length === 1) {
    return arr
  }
  const middle =  Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}
```


