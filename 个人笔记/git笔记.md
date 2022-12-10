@[TOC](目录)

# GIT学习
## 全局设置账号邮箱

```javascript
$ git config --global user.name "Your Name"  
$ git config --global user.email "email@example.com"  
```
通过如下命令把这个目录变成Git可以管理的仓库：
```javascript
$ git init  
```

如果我们想知道上次是怎么修改readme.txt 文件的，需要用 git diff 命令  
```javascript
$ git diff readme.txt  
diff --git a/readme.txt b/readme.txt  
index 46d49bf..9247db6 100644  
--- a/readme.txt  
+++ b/readme.txt  
@@ -1,2 +1,2 @@  
-Git is a version control system. //这一句是被删掉的  
+Git is a distributed version control system. //这一句是新添加的  
Git is free software. 
```
用 `git status` 查看一下当前仓库状态  
` git log` 命令进行查看文件在仓库的版本 
```javascript 
$ git log //查看历史记录  
commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master)  
Author: Michael Liao <askxuefeng@gmail.com>  
Date: Fri May 18 21:06:15 2018 +0800  
append GPL  
commit e475afc93c209a690c39c13a46716e8fa000c366  
Author: Michael Liao <askxuefeng@gmail.com>  
Date: Fri May 18 21:03:36 2018 +0800  
add distributed  
commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0  
Author: Michael Liao <askxuefeng@gmail.com>  
Date: Fri May 18 20:59:18 2018 +0800  
```
好了，现在如果我们想把 readme.txt 文件退回到上一个版本，就可以使用 `git  reset `命令：  
```javascript
$ git reset --hard HEAD^  
//HEAD表示当前版本，则HEAD^表示上一个版本，那么上上版本就是HEAD^^*  
HEAD is now at e475afc add distributed  
```
我们现在想要回到最新的版本，还是使用 git reset 命令：  
```javascript
$ git reset --hard 1094a 
```
这里不能用HEAD而必须使用 commit id  ，因为最新版本在之前返回时已经被删除了，1094a就是最新版本的 commit id，可以在之前的代码中查到*  

## 工作区和暂存区
工作区（Working Directory）  
learngit 文件夹就是一个工作区。  
版本库（Repository）  
工作区有个隐藏目录 .git ，这个不算工作区，而是 Git 的版本库。  
版本库里面的 index(stage)  
文件叫暂存区，还有Git为我们自动创建的第一个分支 master ，以及指向 master  的一个指针叫做 HEAD。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/3d3a2e49db104db69700dc3eb8ab0989.png)

前面我们提到过，如果我们想把文件添加到Git里面时，需要分两步：  
第一步是用 git add 把文件添加进去，实际上就是把文件修改添加到暂存区。  
第二步是用 git  
commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支。（我们现在只有唯一一个分支  
master，所以现在就是往 master 分支上提交更改）  
我们可以使用` git reset HEAD file` 命令把把暂存区的修改撤销掉，重新放回工作区：  
```javascript
$ git reset HEAD readme.txt // git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区，HEAD表示最新版本。    
Unstaged changes after reset:  
```
确实要从版本库中删除该文件，那就用 `git rm `命令删除    
如上图所示我已经把本地仓库的内容推送到了GitHub上了，大家创建完以后应该是一个空的仓库。这时候我们可以在本地learngit仓库下运行命令：
```javascript
$ git remote add origin git@github.com:RFHzhj/learngit.git
```
//"RFHzhj"是我的GitHub的账户名，你需要填写你自己的账户名  添加后，远程库的名字就是 origin ，这是Git默认的叫法。  
然后，我们就可以把本地库的所有内容推送到远程库上：  
使用 `git push` 命令，就是把当前分支 master 推送到远程。  
因为远程库是空的，所以我们在第一次推送 master分支时，要加上 -u 参数，Git不但会把本地的 master 分支内容推送的远程新的master 分支，还会把本地的 master 分支和远程的 master分支关联起来，在以后的推送或者拉取时就可以简化命令。
```javascript
$ git push -u origin master
Counting objects: 20, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (20/20), 1.64 KiB | 560.00 KiB/s, done.
Total 20 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), done.
To github.com:RFHzhj/learngit.git
* [new branch] master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```
从现在起，只要本地作了提交，就可以通过命令： 
```javascript 
$ git push origin master  
```
把本地master 分支的最新修改推送至GitHub。现在，我们拥有了真正的分布式版本库。  
如果想查看你已经配置的远程仓库服务器，可以运行 git remote 命令。  
它会列出你指定的每一个远程服务器的简写。  
如果你已经克隆了自己的仓库，那么至少应该能看到 origin ------这是 Git  
给你克隆的仓库服务器的默认名字：  
```javascript
$ git clone https://github.com/schacon/ticgit
Cloning into 'ticgit'...
remote: Reusing existing pack: 1857, done.
remote: Total 1857 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.
Resolving deltas: 100% (772/772), done.
Checking connectivity... done.
$ cd ticgit
$ git remote
origin
```
你也可以指定选项 -v，会显示需要读写远程仓库使用的 Git保存的简写与其对应的 URL。 

```javascript
$ git remote -v  
origin https://github.com/schacon/ticgit (fetch)  
origin https://github.com/schacon/ticgit (push)  
```
## 分支
查看所有分支  
```javascript
git branch -a  
```
切换分支  
git checkout 分支名字  
```javascript
$ git checkout -- test.txt // 用版本库里的版本替换工作区的版本。
```
**创建并切换到新分支** 
```javascript
git checkout -b panda  
```

修改分支名称：  
如果对于分支不是当前分支，可以使用下面代码： 

```javascript
git branch -m "原分支名" "新分支名"
```
如果是当前，那么可以使用加上新名字 
```javascript 
git branch -m "新分支名称"  
```
将本地创建的分支同步到远程  
```javascript
git push -u origin dev （dev是你创建的分支名） 
```
## 拉取其他分支
```javascript
git pull origin master（分支名称） 
```
## 合并分支
[**https://blog.csdn.net/tmacsky/article/details/78795894**](https://blog.csdn.net/tmacsky/article/details/78795894)
## Git stash  
1、`git stash ` 
备份当前工作区的内容，保存到git 栈中，从最近的一次commit中读取相关内容  
2、`git pull` 或者做其他的工作  
3、`git stash pop ` 从git栈中获取到最近一次stash进去的内容，恢复工作区的内容。。获取之后，会删除栈中对应的stash  由于可能会stash多次，git使用栈管理，我们可以使用`git stash list`查看所有的stash
```javascript
git stash list  
```
显示git栈中的所有工作区内容的备份，  
比如使用`git stash apply stash@{1}`，就可以把版本号为`stash@{1}`的备份取出，不会删除对应的stash。。0为最新版本  

清空git栈: 
```javascript
git stash clear 
```
## --h Git回滚git reflog  
```javascript
$ git reflog
c4dff881 (HEAD -> feature_zjmj_inefficiencies_0825) HEAD@{0}: pull:
Fast-forw
30a543aa HEAD@{1}: reset: moving to HEAD
30a543aa HEAD@{2}: commit: feat: 成效评价中间板块构建
d52718e9 HEAD@{3}: commit: feat: 成效评价中间板块构建
2858d780 HEAD@{4}: commit: feat: 成效评价中间板块构建
3e79d360 HEAD@{5}: pull: Fast-forward
0059e044 HEAD@{6}: pull: Fast-forward
```
找到需要回退的版本，执行命令：`git reset --hard HEAD@{n} ` 
如执行：`git reset --hard 61a942c  `

## 查看线上分支
```
git checkout {id}
```
获取id：
下面是我们的一条ci记录：
![在这里插入图片描述](https://img-blog.csdnimg.cn/d093dfcb7728432f9546e2918b70ff41.png)
我们点击这个id 
之后进入详情点击这里复制id
![在这里插入图片描述](https://img-blog.csdnimg.cn/80f9a5e5ee6d4d46bf39fc8ab452ed80.png)
执行下面代码就可以了
```
git checkout 6f8b12ddb6a7d240268d5fa68d03cf926b7c26fb // 刚刚复制的id
```

## 设置git文件名称大小写敏感  
git 默认不区分文件名大小写  
当你创建一个文件后,叫 readme.md 写入内容后 提交到线上代码仓库.  
然后你在本地修改文件名为 Readme.md 接着你去提交,发现代码没有变化.  
控制台输入git status 也不显示任何信息  
那么就配置git 使其对文件名大小写敏感  

```javascript
git config core.ignorecase false
```