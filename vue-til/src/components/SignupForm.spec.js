import { shallowMount } from '@vue/test-utils';
import SignupForm from '@/components/SignupForm.vue';

/*
  1. 초기값은 빈 문자열입니다. 
  2. 올바른 아이디의 형식을 입력하지 않으면 warningText가 나옵니다.
  3. 3개의 항목을 모두 입력해야 버튼이 활성화됩니다.
*/

describe('SignupForm', () => {
  test('초기값은 빈 문자열입니다.', () => {
    const wrapper = shallowMount(SignupForm);
    expect(wrapper.vm.username).toBe('');
    expect(wrapper.vm.password).toBe('');
    expect(wrapper.vm.nickname).toBe('');
  });
  // 2. 올바른 아이디의 형식을 입력하지 않으면 warningText가 나옵니다.
  test('2. 올바른 아이디의 형식을 입력하지 않으면 warningText가 나옵니다.', () => {
    const wrapper = shallowMount(SignupForm, {
      data() {
        return {
          username: 'test@abc.com',
        };
      },
    });
    // console.log(warningText.html());
    const warningText = wrapper.find('.warning');
    expect(warningText.exists()).toBeFalsy(); // 존재하지 않는가?
    const idInput = wrapper.find('#username');
    console.log('회원가입 ID: ', idInput.element.value);
    expect(wrapper.vm.isUsernameValid).toBeTruthy();
  });

  // 3. 3개의 항목을 모두 입력해야 버튼이 활성화됩니다.
  test('3. 3개의 항목을 모두 입력해야 버튼이 활성화됩니다.', () => {
    const wrapper = shallowMount(SignupForm, {
      data() {
        return {
          username: 'test',
          password: '1234',
          nickname: 'testUser',
        };
      },
    });
    // const result = !this.username || !this.password || !this.nickname;
    expect(wrapper.vm.isUsernameValid).toBeTruthy();
    expect(wrapper.vm.password).toBeTruthy();
    expect(wrapper.vm.nickname).toBeTruthy();
  });
});
