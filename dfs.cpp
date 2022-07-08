#include<iostream>
#include <queue>
using namespace std;

void dfs(vector<int> *a , bool *v,int n ,int start){
    if(v[start]==true){

        return;
    }
v[start]=true;
cout<<start;
for(int i:a[start]){
dfs(a,v,n,i);

}

}


int main(){
vector<int> arr[6];
bool visited[6];
arr[0].push_back(1);
arr[0].push_back(2);
arr[1].push_back(0);
arr[1].push_back(3);
arr[1].push_back(4);
arr[2].push_back(0);
arr[2].push_back(3);
arr[3].push_back(1);
arr[3].push_back(2);
arr[4].push_back(1);
arr[4].push_back(5);
arr[5].push_back(4);
for(int i=0;i<=5;i++){
visited[i]=false;

}
dfs(arr,visited,6,0);
}