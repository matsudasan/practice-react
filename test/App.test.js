import React from 'react';
import { render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from '../src/App';
import { Child, Child2 } from "../src/App"
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter, UseCounterReturnType } from "../src/useCounter"
import { useCounterReducer } from "../src/useCounterReducer"
import { ImageUpload } from "../src/ImageUpload"

const sum = (a, b) => {
  return a + b;
}

const readFile = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const target = event.target
      if (!target) {
        return reject(new Error("readFile error: event.target is blank"));
      }
      const result = target.result
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
};

window.URL.createObjectURL = jest.fn().mockReturnValue('abc')
window.alert = jest.fn();
describe('画像アップロードのテスト', () => {

  beforeEach(() => {
    window.alert.mockClear()
    window.URL.createObjectURL.mockClear()
  })

  test('成功', () => {
    const component = render(<ImageUpload />)
    const input = component.getByTestId('input')
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    userEvent.upload(input, file)
    const img = component.getByTestId('img')
    expect(img).toHaveAttribute('src', 'abc')
    expect(window.alert).not.toHaveBeenCalled()
  })

  test('失敗', () => {
    const component = render(<ImageUpload />)
    const input = component.getByTestId('input')
    const file = new Blob(['hello'], { type: "text/plain" })
    userEvent.upload(input, file)
    expect(window.URL.createObjectURL).not.toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith('画像ファイルをアップロードして下さい。')
  })
})


describe('test', () => {

  test('useCounter', async () => {
    // const { count, increment, decrement } = renderHook(() => useCounter()).result.current; //これだと値の更新を感知できない
    const result = renderHook(() => useCounter()).result;
    render(<Child count={result.current.count} increment={result.current.increment} decrement={result.current.decrement} />)
    const div = screen.getByTestId('increment')
    fireEvent.click(div)
    expect(result.current.count).toBe(1);
    // expect(increment).toBeCalled()
    // const p = await screen.findByTestId('count')
    // expect(p).toHaveTextContent('1')
  })

  test('useCounterReducer', () => {
    const result = renderHook(() => useCounterReducer({ count: 0 })).result;
    const [, dispatch] = result.current
    const { rerender } = render(<Child2 state={result.current[0]} dispatch={dispatch} />)
    const div = screen.getByTestId('increment')
    fireEvent.click(div)
    rerender(<Child2 state={result.current[0]} dispatch={dispatch} />)
    const p = screen.getByTestId('count')
    expect(p).toHaveTextContent('1')
  })

  test('incrementを呼ぶと、countが期待通りの値に変更される', () => {
    const result = renderHook(() => useCounter()).result;
    expect(result.current.count).toBe(0);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("readFile", async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const result = await readFile(file);
    expect(result).toEqual(
      "data:image/png;base64,aGVsbG8="
    );
  })
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});