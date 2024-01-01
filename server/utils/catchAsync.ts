export default (fn: (req: any, res: any, next: any) => Promise<any>) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};
