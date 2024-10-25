export default function formatDate() {
  //1.Get Date Now
  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedDate = formatter.format(today);

  //2.Format date
  let parts = formattedDate.split("/");
  let date = new Date(parts[2], parts[1] - 1, parts[0]);

  //3.Format month
  const pad = (number) => (number < 10 ? `0${number}` : number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = pad(date.getDate());
  let monthIndex = date.getMonth();
  let month = months[monthIndex];
  let year = date.getFullYear();

  return `${day} ${month} ${year}`;
}