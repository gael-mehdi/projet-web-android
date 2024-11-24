Part of Web Development - ISMIN

Course followed by students of Mines St Etienne, ISMIN - M2 Computer Science.

# TP4: Introduction to NestJS's HTTP module and RxJS

## 📚 Resources

- [HTTP module](https://docs.nestjs.com/techniques/http-module)
- [RxJS](https://rxjs.dev/)

## 📝 Goal

The goal of this TP is to discover the HTTP module of NestJS and how to use it to fetch data from an external API.

### Step 1: ♻️ Prepare the sources

Copy/paste `src` and `package.json` of TP3 in this project. Run `npm install` to fetch the dependencies.

### Step 2: 👓 Use the HTTP module to fetch the data

Instead of using the content of a local file, initialize the data with https://api.npoint.io/fbb2a6039fc21e320b30.

⚠️ This endpoint contains 7000+ books, so be careful when dealing with it.

To do so you will need HttpModule: https://docs.nestjs.com/techniques/http-module

### Step 3: 🔀 Load both local and remote data

Fetch and handle both a local file and remote data at the same time, tips: take a look at `Promise.all`

## 🔑 Solution

An implementation of the TP is available on `solution` branch. To switch to the solution just do:

```
# Commit or revert your local changes
# git add . && git commit -m "YOUR_MSG" 

# Update your repository
git pull

# Switch to `solution` branch
git checkout solution
```
