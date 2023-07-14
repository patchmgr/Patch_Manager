n=['a','b','c','h']
def printall(n,s,e):
    if(s==e):
        print(n)
        return 0
    for i in range(s,e+1):
        temp=n[s]
        n[s]=n[i]
        n[i]=temp
        printall(n,s+1,e)
        temp=n[s]
        n[s]=n[i]
        n[i]=temp    
printall(n,0,len(n)-1)