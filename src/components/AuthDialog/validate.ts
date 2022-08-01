import { ElNotification } from 'element-plus';
import _ from 'lodash';

export function validateForm(form: Record<string, string>, actionType: string) {
  if (_.isEmpty(form.email) && actionType !== 'other') {
    ElNotification({
      title: '请输入邮箱',
      type: 'warning'
    });
    return false;
  }
  if (_.isEmpty(form.username) && actionType !== 'email') {
    ElNotification({
      title: '请输入用户名',
      type: 'warning'
    });
    return false;
  }
  if (_.isEmpty(form.password)) {
    ElNotification({
      title: '请输入密码',
      type: 'warning'
    });
    return false;
  }
  if (form.password !== form.repassword && actionType === 'register') {
    ElNotification({
      title: '密码不一致',
      type: 'warning'
    });
    return false;
  }
  if (_.isEmpty(form.code) && actionType === 'register') {
    ElNotification({
      title: '请填写验证码',
      type: 'warning'
    });
    return false;
  }
  return true;
}
