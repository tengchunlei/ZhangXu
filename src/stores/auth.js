import { message } from 'antd';
import { observable ,action} from 'mobx';
import { Auth } from '../models';
import UserStore from './user';
import HistoryStore from './history';
import ImageStore from './image';

class AuthStore {
   
    @observable values={
        username:'',
        password:''
    };



    @action setUsername(username){
        this.values.username=username;
    }

    @action setPassword(password){
        this.values.password=password;
    }

    @action login(){
        return new Promise((resolve,reject)=>{
            Auth.login(this.values.username,this.values.password).then(user=>{
                UserStore.pullUser();
            resolve(user);
        }).catch(err=>{
              UserStore.resetUser();
              message.error('登录失败，请重新检查用户名与密码');
                reject(err);
            })
        } );
    }



    @action register(){
        return new Promise((resolve,reject)=>{
            Auth.register(this.values.username,this.values.password).then(user=>{
                UserStore.pullUser();
               resolve(user);
            }).catch(err=>{
                UserStore.resetUser();
                message.error('注册失败');
                reject(err);
            })
        } );
       
    }
    

    
    @action logout(){
            Auth.logout();
            UserStore.resetUser();
            HistoryStore.reset();
            ImageStore.reset();
    }
 
}


export default new AuthStore();