import { shallowMount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

/*
1. 초기값 빈 문자열 테스트 
2. id 이메일 형식인지 테스트 
3. 이메일 버튼 disabled 테스트
*/
describe('LoginForm.vue', () => {
  test('로그인 폼의 초기값이 빈 문자열로 설정되어 있다.', () => {
    const wrapper = shallowMount(LoginForm);
    // console.log(wrapper.vm.username);
    expect(wrapper.vm.username).toBe('');
    expect(wrapper.vm.username).not.toBe('test');
  });

  test('id는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test@abc.com',
        };
      },
    });
    // const idInput = wrapper.find('#username');
    // console.log('id의 값: ', idInput.element.value);
    expect(wrapper.vm.isUsernameValid).toBeTruthy();
  });

  test('올바른 아이디와 비밀번호가 입력된다면 활성화됨', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test@abc.com',
          password: '1234',
        };
      },
    });
    const button = wrapper.find('button.btn');
    expect(button.element.disabled).toBeFalsy(); // false가 활성화
  });
});
