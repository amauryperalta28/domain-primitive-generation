using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's DecimalSalary
/// </summary>
public sealed class DecimalSalary : ICoreDomainPrimitive<decimal>
{
	/// <summary>
	/// As primitive types are inlined by the compiler the coverlet tool does not catch a hit for 
	/// lines `private const decimal MinValue = 0.01M; and MaxValue.
	/// </summary>
	#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.
	private static readonly decimal MinValue = 0.01M;

	private static readonly decimal MaxValue = 99_999M;

	#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.

	/// <summary>
	/// Shortcut for constructor <see cref="DecimalSalary"/>.
	/// <param name="decimalSalary">Represents a decimalSalary.</param>
	/// <returns>An instance of <see cref="DecimalSalary"/></returns>
	/// </summary>
	public static DecimalSalary From(string decimalSalary) => new(decimalSalary);

	private DecimalSalary(decimal rawDecimalSalary)
	  => Value = Arguments.Between(rawDecimalSalary, MinValue, MaxValue, nameof(rawDecimalSalary), "Invalid value or format for User's DecimalSalary");

	/// <summary>
	/// Gets property value
	/// </summary>
	public decimal Value { get; }

}
