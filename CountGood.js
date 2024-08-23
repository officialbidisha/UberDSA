var countGood = function(nums, k) {
    let n = nums.length,map=new Map(), ans = 0, count = 0, left = 0, right = 0;
    
    while(right < n){
        //if it exist in window then we get 1 pair wich match the condition i < j and arr[i] == arr[j].  so we will increase the count fot this window so the we can match with k 
        if(map.has(nums[right])){ 
            count += map.get(nums[right])
           map.set(nums[right],map.get(nums[right])+1)
        }
        else{
          map.set(nums[right],1)
        }

        // when our target match with k mean we gat k or more than k good pair
        while(count >= k){
            // deleting left index from window
            map.set(nums[left],map.get(nums[left])-1)
            count -= map.get(nums[left])
            left++
            
            //bcz if the window is valid for thai index then it will also valid for until last index of the arr
            ans += n - right;
        }

        right++;
    }

    return ans;
    
};
